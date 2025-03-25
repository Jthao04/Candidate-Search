import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateDetails from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<CandidateDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        console.log('Fetching candidates...');
        const users = await searchGithub(); // returns array of 30 users
        console.log('Fetched candidates:', users);

        const detailedCandidates = await Promise.all(
          users.map(async (user: { login: string; id: number; avatar_url: string }) => {
            const extra = await searchGithubUser(user.login);
            const {
              name,
              location,
              email,
              company,
              html_url,
              bio
            } = extra;
            return {
              login: user.login,
              avatar_url: user.avatar_url,
              name: name || 'No Name',
              location: location || 'No Location',
              email: email || 'No Email',
              company: company || 'No Company',
              html_url,
              bio: bio || 'No Bio'
            } as CandidateDetails;
          })
        );
        console.log('Detailed candidates:', detailedCandidates);
        setCandidates(detailedCandidates);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleAdd = () => {
    const candidateToAdd = candidates[currentIndex];
    const stored = localStorage.getItem('savedCandidates');
    const savedCandidates = stored ? JSON.parse(stored) : [];
    savedCandidates.push(candidateToAdd);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    setCurrentIndex(currentIndex + 1);
  };

  const handleIgnore = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleFetchMore = async () => {
    setCandidates([]);
    setCurrentIndex(0);
    const users = await searchGithub();
    const detailedCandidates = await Promise.all(
      users.map(async (user: { login: string; id: number; avatar_url: string }) => {
        const extra = await searchGithubUser(user.login);
        const {
          name,
          location,
          email,
          company,
          html_url,
          bio
        } = extra;
        return {
          login: user.login,
          avatar_url: user.avatar_url,
          name: name || 'No Name',
          location: location || 'No Location',
          email: email || 'No Email',
          company: company || 'No Company',
          html_url,
          bio: bio || 'No Bio'
        } as CandidateDetails;
      })
    );
    setCandidates(detailedCandidates);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentIndex < candidates.length ? (
        <CandidateCard
          candidate={candidates[currentIndex]}
          onAdd={handleAdd}
          onIgnore={handleIgnore}
        />
      ) : (
        <div>
          <p>No more candidates.</p>
          <button onClick={handleFetchMore}>Fetch More Candidates</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
