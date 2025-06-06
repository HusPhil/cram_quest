import { BASE_URL } from '../../../data/api';

const baseSubjectRoute = 'subjects';

// subjects/{subjectId}/materials
// subjects/12/materials

// to run git commands you need a 'git' in that directory -> git init 
// github actions <-> g-i-t commands-> CI/CD -> Continuous Integration / Continuous Development 
// gitlab 
// remote -> internet -> nasa ibang lugar
// local means nasa laptop or nasa network
// stage the files -> git add .
// commit the files in the staging -> git commit -m "message"
// push to remote repo

// gawa ng local main branch 
// 

// gagawa ng local branch for a certain feature or implementation -> git checkout -b materials
 // git checkout materials
// git add .
// git commit -m "message"
// babalik sa local main branch -> git checkout riri

// local branch na riri <-> remote branch na riri

// merge ko yung changes from the material branch sa local main branch -> git merge materials 

// from materials to riri - materials
// git checkout riri
// git merge materials -local riri  
// git push - yung mapupush remote riri 

// git push --set-upstream origin riri
// git remote add "origin" <link ng remote repo sa github>
// 


export const getBaseSubjectWithIdEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}`;
};

export const getSubjectQuestsEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}/quests`;
};

export const getCreateSubjectEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/?player_id=${playerId}`;
};

export const getMaterialEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}/materials`;
};