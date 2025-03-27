import { useState, useEffect } from "react";
import { FaMinusCircle } from "react-icons/fa";
import CandidateDetails from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<CandidateDetails[]>([]);

  // Load candidates from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("savedCandidates");
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  // Remove candidate by filtering them out and saving to localStorage
  const handleReject = (candidateLogin: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== candidateLogin
    );
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name (Login)</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={candidate.id || index}>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={candidate.avatar_url}
                      alt={candidate.login}
                    />
                  </a>
                </td>
                <td>
                  {candidate.name} ({candidate.login})
                </td>
                <td>{candidate.location}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                </td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td>
                  <FaMinusCircle
                    className="redButton"
                    onClick={() => handleReject(candidate.login)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
