import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {products as demoProducts} from '../data/products';
import {supabase} from '../lib/supabase';
const C=createContext(null);
export function StoreProvider({children}){
 const [products,setProducts]=useState(demoProducts);
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('techvilla-cart')||'[]'));
 const [notice,setNotice]=useState('');
 useEffect(()=>{localStorage.setItem('techvilla-cart',JSON.stringify(cart));},[cart]);
 useEffect(()=>{if(!supabase)return;supabase.from('products').select('*').eq('active',true).then(({data,error})=>{if(!error&&data?.length)setProducts(data.map(p=>({...p,image:p.image_url||p.image,storage:p.storage||['Standard'],colors:p.colors||['Default'],specs:p.specs||{},demo:false})));});},[]);
 const add=(product,qty=1)=>{setCart(old=>{const found=old.find(x=>x.id===product.id);return found?old.map(x=>x.id===product.id?{...x,qty:x.qty+qty}:x):[...old,{...product,qty}];});setNotice('Added to your cart');};
 const update=(id,qty)=>setCart(old=>old.map(x=>x.id===id?{...x,qty}:x).filter(x=>x.qty>0));
 const remove=id=>setCart(old=>old.filter(x=>x.id!==id));
 const total=cart.reduce((s,p)=>s+p.price*p.qty,0);
 useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),2200);return()=>clearTimeout(t)},[notice]);
 const value=useMemo(()=>({products,setProducts,cart,add,update,remove,total,notice,setNotice}),[products,cart,total,notice]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export const useStore=()=>useContext(C);
