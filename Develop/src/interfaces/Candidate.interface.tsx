// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
id: number;
login: string;
avatar_url: string;
}

export default interface CandidateDetails extends Candidate {
name: string;
location: string;
email: string;
company: string;
html_url: string;
bio: string;
}