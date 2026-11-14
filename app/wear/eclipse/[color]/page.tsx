import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EclipseProductView from "../../../EclipseProductView";

type Color = "black" | "espresso";
export function generateStaticParams(){ return [{color:"black"},{color:"espresso"}]; }
export async function generateMetadata({params}:{params:Promise<{color:string}>}):Promise<Metadata>{
 const {color}=await params;
 if(color!=="black"&&color!=="espresso") return {title:"NOCTIVE WEAR"};
 return {title:`Eclipse Zip-Up Hoodie — ${color==="black"?"Black":"Espresso"}`,description:`NOCTIVE Eclipse Zip-Up Hoodie in ${color}. After Dark / Drop 001.`};
}
export default async function EclipseProductPage({params}:{params:Promise<{color:string}>}){
 const {color}=await params;
 if(color!=="black"&&color!=="espresso") notFound();
 const cents=Number(process.env.ECLIPSE_PRICE_CENTS||0);
 const ready=process.env.ECLIPSE_PREORDERS_OPEN==="true"&&!!process.env.STRIPE_SECRET_KEY&&Number.isInteger(cents)&&cents>0&&!!process.env.ECLIPSE_ESTIMATED_SHIP_DATE&&!!process.env.ECLIPSE_SHIPPING_CENTS;
 return <EclipseProductView color={color as Color} preorderOpen={ready} price={cents>0?cents:null} estimatedShip={process.env.ECLIPSE_ESTIMATED_SHIP_DATE||null}/>;
}
