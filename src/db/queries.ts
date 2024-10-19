import {db} from './index'
import { users,InsertUser,SelectUser} from './schema/Users'
import { eq } from "drizzle-orm";
import { insertTask, selectTask, todos } from './schema/Todos';

 
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

export const getTasks = async(id:selectTask['userId'])=>{ 
  const query = await db
    .select()
    .from(todos)
    .where(eq(todos.userId,id))
    return query
}

export const createTask = async(data: insertTask)=>{
  await db.insert(todos).values(data)
}
