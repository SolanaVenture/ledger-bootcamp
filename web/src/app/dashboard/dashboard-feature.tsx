import axios from 'axios';
import { useState, useEffect } from 'react';
import { AppHero } from '../ui/ui-layout';

export default function DashboardFeature() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/fluffy')
      .then((response) => {
        // console.log(response);
        setGreeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <AppHero title="gm" subtitle={greeting} />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2"></div>
      </div>
    </div>
  );
}
