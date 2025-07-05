import React from 'react';
import { FaBoxOpen, FaCogs, FaTruck, FaCheckCircle } from 'react-icons/fa';
import './OrderTimeline.css';

const TIMELINE_STEPS = [
  {
    key: 'Getting Ready',
    label: 'Getting Ready',
    icon: <FaBoxOpen />,
    color: '#2563eb',
  },
  {
    key: 'Processing',
    label: 'Processing',
    icon: <FaCogs />,
    color: '#22c55e',
  },
  {
    key: 'Shipped',
    label: 'Shipped',
    icon: <FaTruck />,
    color: '#f59e42',
  },
  {
    key: 'Delivered',
    label: 'Delivered',
    icon: <FaCheckCircle />,
    color: '#059669',
  },
];

export default function OrderTimeline({ status }) {
  const currentIdx = TIMELINE_STEPS.findIndex(s => s.key === status);
  return (
    <div className="order-timeline">
      <div className="timeline-vertical">
        {TIMELINE_STEPS.map((step, idx) => (
          <div className={`timeline-step-vertical${idx <= currentIdx ? ' active' : ''}`} key={step.key}>
            <div className="timeline-icon-wrapper" style={{ background: idx <= currentIdx ? step.color : '#e0e0e0' }}>
              {step.icon}
            </div>
            <div className="timeline-label" style={{ color: idx <= currentIdx ? step.color : '#888' }}>{step.label}</div>
            {idx < TIMELINE_STEPS.length - 1 && <div className="timeline-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
