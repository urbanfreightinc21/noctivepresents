import { NextResponse } from "next/server";
import { getEclipseDb } from "../../../lib/eclipse-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(){
  if(process.env.ECLIPSE_PREORDERS_OPEN!=="true")
    return NextResponse.json({available:false},{headers:{"Cache-Control":"no-store"}});
  try{
    const result=await getEclipseDb().query(
      "SELECT color, capacity - reserved AS remaining FROM eclipse_inventory WHERE color IN ('black','espresso')"
    );
    const remaining: Record<string,number>={};
    for(const item of result.rows) remaining[item.color]=Number(item.remaining);
    if(!("black" in remaining)||!("espresso" in remaining))throw new Error("Inventory is not seeded");
    return NextResponse.json({available:true,remaining},{headers:{"Cache-Control":"no-store"}});
  }catch{
    return NextResponse.json({available:false,error:"Inventory unavailable"},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
