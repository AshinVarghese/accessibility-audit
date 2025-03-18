import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

const checklistItems = [
    { id: 1, text: "All images have descriptive alt text" },
    { id: 2, text: "Headings follow logical order (h1 > h2 > h3)" },
    { id: 3, text: "Color contrast ratio meets WCAG AA standards" },
    { id: 4, text: "All functionality works with keyboard only" },
    { id: 5, text: "Form fields have associated labels" }
];

export default function Checklist() {
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheck = (id) => {
        setCheckedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Manual Verification Checklist</Card.Title>
                <Card.Text className="text-muted small">
                    Check these items after automated scan
                </Card.Text>

                {checklistItems.map(item => (
                    <Form.Check
                        key={item.id}
                        type="checkbox"
                        id={`check-${item.id}`}
                        label={item.text}
                        checked={checkedItems.includes(item.id)}
                        onChange={() => handleCheck(item.id)}
                        className="mb-2"
                    />
                ))}

                <div className="mt-3">
                    Progress: {checkedItems.length}/{checklistItems.length} completed
                </div>
            </Card.Body>
        </Card>
    );
}