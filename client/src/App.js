import React, { useState } from 'react';
import { Container, Form, Button, Alert, Accordion } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checklist from './components/Checklist';
import { withTimeout } from './utils/api';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [waveRes, lighthouseRes] = await Promise.allSettled([
        withTimeout(axios.post('/.netlify/functions/wave', { url })),
        withTimeout(axios.post('/.netlify/functions/lighthouse', { url }))
      ]);

      const results = {
        wave: waveRes.status === 'fulfilled' ? waveRes.value.data : null,
        lighthouse: lighthouseRes.status === 'fulfilled' ? lighthouseRes.value.data : null
      };

      setResults(results);

      if (!results.wave || !results.lighthouse) {
        setError('Partial scan failed - some results may be missing');
      }
    } catch (err) {
      setError('Scan failed - check console for details');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Website Accessibility Scanner</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Website URL</Form.Label>
          <Form.Control
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Scan Website
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

      {results && (
        <div className="mt-5">
          <h3>Scan Results</h3>
          {/* WAVE Results */}
          <div className="mb-5">
            <h4>Automated Checks</h4>
            <p>Total Errors: {results.wave.categories.error.count}</p>
            <Accordion>
              {results.categories.error.items.map((issue, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>{issue.description}</Accordion.Header>
                  <Accordion.Body>
                    <p><strong>Element:</strong> <code>{issue.selector}</code></p>
                    <p><strong>How to Fix:</strong> {issue.help}</p>
                    <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                      Learn More
                    </a>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* Lighthouse Results */}
          <div className="mb-5">
            <h4>Performance Metrics</h4>
            <p>Accessibility Score:
              {results.lighthouse.categories.accessibility.score * 100}%
            </p>
            <ul>
              {results.lighthouse.audits['color-contrast'].details.items.map((item, i) => (
                <li key={i}>Low contrast: {item.node.snippet}</li>
              ))}
            </ul>
          </div>

          {/* Checklist Component */}
          <Checklist />
        </div>
      )}
    </Container>
  );
}

export default App;