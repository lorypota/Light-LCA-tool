import db from '$lib/db/mongo';

export const projects = db.collection('projects');
