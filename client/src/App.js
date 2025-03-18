import React, { useState } from 'react';
import { Container, Form, Button, Alert, Accordion } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/.netlify/functions/wave-api', { url });
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Error scanning website. Please try again.');
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
          <p>Total Errors: {results.categories.error.count}</p>
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
      )}
    </Container>
  );
}

export default App;