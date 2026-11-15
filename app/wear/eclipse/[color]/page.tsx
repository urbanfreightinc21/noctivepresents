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
 const cents=8000;
 const ready=false; // Public launch: checkout intentionally disabled.
 return <EclipseProductView color={color as Color} preorderOpen={ready} price={cents>0?cents:null} estimatedShip={"4–6 weeks after order placement (estimated)"} isTestMode={process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")||false}/>;
}
