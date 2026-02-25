import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, getHistoryState, deleteEntry } from '../lib/storage';
import { Trash2 } from 'lucide-react';
import './PracticePage.css';

export default function PracticePage() {
  const [history, setHistory] = useState([]);
  const [hasCorruptedEntry, setHasCorruptedEntry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function loadHistory() {
      const state = getHistoryState();
      setHistory(state.entries);
      setHasCorruptedEntry(state.hadCorruptedEntry);
    }

    loadHistory();
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, []);

  function handleDelete(id) {
    deleteEntry(id);
    const state = getHistoryState();
    setHistory(state.entries);
    setHasCorruptedEntry(state.hadCorruptedEntry);
  }

  return (
    <div className="history-page">
      <h2 className="history-page__title">Analysis History</h2>
      <p className="history-page__subtitle">
        All your past JD analyses are stored locally. Click any entry to view the full results.
      </p>
      {hasCorruptedEntry && (
        <p className="history-page__warning">
          One saved entry couldn&apos;t be loaded. Create a new analysis.
        </p>
      )}

      {history.length === 0 ? (
        <div className="history-page__empty">
          <p>No history yet. Go to <strong>Assessments</strong> to analyze your first job description.</p>
        </div>
      ) : (
        <div className="history-page__list">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="history-page__item"
              onClick={() => navigate(`/resources?id=${entry.id}`)}
            >
              <div className="history-page__item-info">
                <span className="history-page__item-company">
                  {entry.company || 'No company'}
                </span>
                <span className="history-page__item-role">
                  {entry.role || 'No role'}
                </span>
                <span className="history-page__item-date">
                  {new Date(entry.createdAt).toLocaleDateString()} &middot; {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="history-page__item-right">
                <span className="history-page__item-score">{entry.finalScore}</span>
                <button
                  className="history-page__delete-btn"
                  onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                  aria-label="Delete entry"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
