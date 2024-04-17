import db from '$db/mongo';

export const projects = db.collection('projects');
