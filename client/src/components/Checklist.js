// src/components/Checklist.js
const checklistItems = [
    "All images have alt text",
    "Proper heading structure",
    "Sufficient color contrast",
    "Keyboard navigable",
    "Form labels present"
];

export default function Checklist() {
    return (
        <div className="mt-4">
            <h4>Manual Verification Checklist</h4>
            {checklistItems.map((item, index) => (
                <div key={index} className="form-check">
                    <input className="form-check-input" type="checkbox" id={`check-${index}`} />
                    <label className="form-check-label" htmlFor={`check-${index}`}>
                        {item}
                    </label>
                </div>
            ))}
        </div>
    );
}