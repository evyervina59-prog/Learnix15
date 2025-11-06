import React from 'react';
import InteractiveContent from './components/InteractiveContent';

const EmbedApp: React.FC = () => {
    return (
        <div className="min-h-screen bg-sky-50 text-slate-800 py-8">
            <main>
                <InteractiveContent />
            </main>
        </div>
    );
};

export default EmbedApp;
