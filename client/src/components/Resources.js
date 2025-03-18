import React from 'react';
import { Card } from 'react-bootstrap';

export default function Resources() {
    return (
        <div className="mt-5">
            <h3>Learning Resources</h3>
            <Card>
                <Card.Body>
                    <Card.Title>Free Accessibility Guides</Card.Title>
                    <ul>
                        <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noreferrer">W3C Web Accessibility Initiative</a></li>
                        <li><a href="https://webaim.org/" target="_blank" rel="noreferrer">WebAIM Resources</a></li>
                        <li><a href="https://www.a11yproject.com/checklist/" target="_blank" rel="noreferrer">A11Y Project Checklist</a></li>
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}