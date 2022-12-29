import { getAuth } from 'firebase-admin/auth';
import { adminApp } from './firebase';


export const adminAuth = getAuth(adminApp);
