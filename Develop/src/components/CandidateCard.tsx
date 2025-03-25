import React from 'react';
import CandidateDetails from '../interfaces/Candidate.interface';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface CandidateCardProps {
    candidate: CandidateDetails;
    onAdd: () => void;
    onIgnore: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onAdd, onIgnore }) => {
    return (
        <div className="candidate-card">
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                <img src={candidate.avatar_url} alt={candidate.login} />
            </a>
            <h2>{candidate.name}({candidate.login})</h2>
            <p>Location: {candidate.location}</p>
            <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
            <p>Company: {candidate.company}</p>
            <p>Bio: {candidate.bio}</p>
            <div className="candidate-actions">
                <FaMinusCircle className="redButton" onClick={onIgnore} />
                <FaPlusCircle className="greenButton" onClick={onAdd}  />
            </div>
        </div>
    );
};

export default CandidateCard;