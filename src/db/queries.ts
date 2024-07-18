import {db} from './index'
import { users,InsertUser,SelectUser} from './schema/Users'
import { eq } from "drizzle-orm";

 
export const checkUser= async(email:SelectUser['email'])=>{
  const query = await db
    .select()
    .from(users)
    .where(eq(users.email,email))
  return query.length > 0
}

export const createUser= async(data: InsertUser)=> {
    await db.insert(users).values(data);
}

export const getUser = async(email:SelectUser['email'])=>{ 
  const query = await db
  .select()
  .from(users)
  .where(eq(users.email,email))
  return query
}

export const getUserById= async(id:SelectUser['id'])=>{ 
  const query = await db  
  .select()
  .from(users)
  .where(eq(users.id,id))
  return query
}
