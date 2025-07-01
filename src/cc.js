import React, { useState } from 'react';
import './cc.css'; // Import the CSS file
import { PiWhatsappLogoThin } from "react-icons/pi"; // Import the specific WhatsApp icon

const AltfCostCalculator = () => {
    const [formData, setFormData] = useState({
        meetingsPerWeek: '',
        avgCostPerMeeting: '',
        teamMembers: '',
        cafeSpendPerPerson: '',
        currentWorkspaceCost: ''
    });

    const [location, setLocation] = useState('gurgaon');
    const [results, setResults] = useState(null);

    const locationRates = {
        noida: 6500,
        gurgaon: 10000,
        delhi: 9000,
        // Added Hyderabad
        hyderabad: 8500
    };

    const handleInputChange = (field, value) => {
        // New validation for teamMembers
        if (field === 'teamMembers' && parseFloat(value) < 4 && value !== '') {
            alert('Team size cannot be less than 4.');
            return;
        }

        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const calculateCosts = () => {
        const meetings = parseFloat(formData.meetingsPerWeek) || 0;
        const meetingCost = parseFloat(formData.avgCostPerMeeting) || 0;
        const teamSize = parseFloat(formData.teamMembers) || 0;
        const cafeSpend = parseFloat(formData.cafeSpendPerPerson) || 0;
        const workspaceCost = parseFloat(formData.currentWorkspaceCost) || 0;

        if (meetings === 0 || teamSize === 0) {
            alert('Please enter valid values for meetings per week and team size.');
            return;
        }

        const weeksPerMonth = 4.33;

        // CORRECTED calculation logic - everything calculated for the full team
        const monthlyMeetingCostTotal = meetings * meetingCost * weeksPerMonth; // Total meeting cost for team
        const monthlyCafeSpendTotal = meetings * teamSize * cafeSpend * weeksPerMonth; // Total cafe spend for team
        const totalCurrentCostForTeam = monthlyMeetingCostTotal + monthlyCafeSpendTotal + workspaceCost; // Total current cost for entire team

        // Per person calculations for display
        const monthlyMeetingCostPerPerson = monthlyMeetingCostTotal / teamSize;
        const monthlyCafeSpendPerPerson = monthlyCafeSpendTotal / teamSize;
        const workspaceCostPerPerson = workspaceCost / teamSize;
        const currentCostPerPerson = totalCurrentCostForTeam / teamSize;

        const altfRatePerPerson = locationRates[location];
        const altfTotalCost = teamSize * altfRatePerPerson;

        const savings = totalCurrentCostForTeam - altfTotalCost;
        const savingsPercentage = totalCurrentCostForTeam > 0 ? (savings / totalCurrentCostForTeam) * 100 : 0;

        setResults({
            monthlyMeetingCostTotal: monthlyMeetingCostTotal,
            monthlyCafeSpendTotal: monthlyCafeSpendTotal,
            workspaceCost,
            totalCurrentCostForTeam,
            monthlyMeetingCostPerPerson,
            monthlyCafeSpendPerPerson,
            workspaceCostPerPerson,
            currentCostPerPerson,
            altfRatePerPerson,
            altfTotalCost,
            savings,
            savingsPercentage,
            teamSize,
            location
        });
    };

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Handler for clicking outside the modal content
    const handleOverlayClick = (e) => {
        // Close modal only if the click is directly on the overlay, not its children
        if (e.target.classList.contains('altf-modal-overlay')) {
            setResults(null);
        }
    };

    const phoneNumber = "919958500568"; // Replace with the actual phone number
    const chatSalesMessage = "Hi, I'd like to chat with a sales executive.";

    return (
        <div className="altf-calculator-container">
            <div className="altf-calculator-wrapper">
                {/* New: Main content area for desktop layout */}
                <div className="altf-main-content">
                    {/* Header */}
                    <div className="altf-header">
                        <div className="altf-logo-section">
                            <img src="https://www.altfcoworking.com/assets/header-logo-DRMD8_iB.avif" alt="Logo" className="altf-logo" />
                            <h1 className="altf-title">
                                What's Your Office <span className="altf-title-highlight">Really Costing</span> You?
                            </h1>
                            <p className="altf-subtitle">
                                Calculate how much you're spending on scattered workspaces and see how alt.f transforms your cost efficiency.
                            </p>
                        </div>
                    </div>

                    {/* Main Calculator */}
                    <div className="altf-calculator-main-section">
                        <div className="altf-calculator-card">
                            <div className="altf-calculator-header-band">
                                <h2 className="altf-calculator-header-title">Cost Calculator</h2>
                            </div>
                            <div className="altf-calculator-body">
                                {/* Location Selector */}
                                <div className="altf-location-selector">
                                    <label className="altf-label">Choose Location</label>
                                    <div className="altf-location-buttons">
                                        {Object.entries(locationRates).map(([loc, rate]) => (
                                            <button
                                                key={loc}
                                                className={`altf-location-button ${location === loc ? 'altf-location-button-active' : ''}`}
                                                onClick={() => setLocation(loc)}
                                            >
                                                <div className="altf-location-name">{capitalizeFirst(loc)}</div>
                                                <div className="altf-location-rate">{formatCurrency(rate)}/mo</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Inputs */}
                                <div className="altf-form-inputs">
                                    <div>
                                        <label className="altf-label">
                                            Meetings per week
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.meetingsPerWeek}
                                            onChange={(e) => handleInputChange('meetingsPerWeek', e.target.value)}
                                            placeholder="e.g., 3"
                                            className="altf-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="altf-label">
                                            Average cost per meeting/month
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.avgCostPerMeeting}
                                            onChange={(e) => handleInputChange('avgCostPerMeeting', e.target.value)}
                                            placeholder="e.g., 500"
                                            className="altf-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="altf-label">
                                            Team size
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.teamMembers}
                                            onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                                            placeholder="e.g., 4"
                                            className="altf-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="altf-label">
                                            Café spend per person/month
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.cafeSpendPerPerson}
                                            onChange={(e) => handleInputChange('cafeSpendPerPerson', e.target.value)}
                                            placeholder="e.g., 150"
                                            className="altf-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="altf-label">
                                            Monthly cost of current workspace (optional)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.currentWorkspaceCost}
                                            onChange={(e) => handleInputChange('currentWorkspaceCost', e.target.value)}
                                            placeholder="e.g., 5000"
                                            className="altf-input"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={calculateCosts}
                                    className="altf-calculate-button"
                                >
                                    Calculate My Savings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Modal */}
                {results && (
                    <div className="altf-modal-overlay" onClick={handleOverlayClick}>
                        <div className="altf-modal-content">
                            <button
                                className="altf-modal-close-button"
                                onClick={() => setResults(null)}
                            >
                                ✕
                            </button>

                            <div className="altf-modal-header">
                                <h2 className="altf-modal-title">Cost Analysis</h2>
                            </div>

                            <div className="altf-modal-body">
                                <div className="altf-modal-body">
                                    {/* Current Spend Section */}
                                    <div className="altf-current-spend-section">
                                        <div className="altf-section-header">
                                            <h3 className="altf-section-title">Current Monthly Spend</h3>
                                            <span className="altf-badge">
                                                For {results.teamSize} People
                                            </span>
                                        </div>
                                        <div className="altf-section-content">
                                            {/* Per Person Breakdown (using the "Total" variables which are now per-person) */}
                                            <div className="altf-per-person-breakdown">
                                                <div className="altf-per-person-title">Per Person Breakdown:</div>
                                                <div className="altf-cost-item-small">
                                                    <span>Meetings:</span>
                                                    {/* These are now directly the per-person values */}
                                                    <span>{formatCurrency(results.monthlyMeetingCostTotal)}</span>
                                                </div>
                                                <div className="altf-cost-item-small">
                                                    <span>Café:</span>
                                                    {/* These are now directly the per-person values */}
                                                    <span>{formatCurrency(results.monthlyCafeSpendTotal)}</span>
                                                </div>
                                                <div className="altf-cost-item-small">
                                                    <span>Workspace:</span>
                                                    {/* This is now directly the per-person value */}
                                                    <span>{formatCurrency(results.workspaceCost)}</span>
                                                </div>
                                                <div className="altf-total-cost-line-small">
                                                    <div className="altf-cost-item-small altf-per-person-total">
                                                        <span>Per Person Total:</span>
                                                        {/* This needs to sum the per-person values */}
                                                        <span>{formatCurrency(results.monthlyMeetingCostTotal + results.monthlyCafeSpendTotal + results.workspaceCost)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Team Totals (calculated from per-person values) */}
                                            <div className="altf-cost-item-group">
                                                <div className="altf-cost-item">
                                                    <span>Meetings (Total):</span>
                                                    {/* Calculate total for team: per-person * teamSize */}
                                                    <span className="altf-cost-value">{formatCurrency(results.monthlyMeetingCostTotal * results.teamSize)}</span>
                                                </div>
                                                <div className="altf-cost-item">
                                                    <span>Café Spend (Total):</span>
                                                    {/* Calculate total for team: per-person * teamSize */}
                                                    <span className="altf-cost-value">{formatCurrency(results.monthlyCafeSpendTotal * results.teamSize)}</span>
                                                </div>
                                                <div className="altf-cost-item">
                                                    <span>Workspace (Total):</span>
                                                    {/* Calculate total for team: per-person * teamSize */}
                                                    <span className="altf-cost-value">{formatCurrency(results.workspaceCost * results.teamSize)}</span>
                                                </div>
                                                <div className="altf-total-cost-line">
                                                    <div className="altf-cost-item altf-total-cost">
                                                        <span>Team Total:</span>
                                                        {/* Calculate total for team by summing up the per-person totals and multiplying by team size */}
                                                        <span>{formatCurrency((results.monthlyMeetingCostTotal + results.monthlyCafeSpendTotal + results.workspaceCost) * results.teamSize)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Alt.f Workspace Section */}
                                    <div className="altf-altf-workspace-section">
                                        <div className="altf-section-header">
                                            <h3 className="altf-section-title">alt.f coworking</h3>
                                            <span className="altf-badge-dark">
                                                For {results.teamSize} People
                                            </span>
                                        </div>
                                        <div className="altf-section-content">
                                            <div className="altf-cost-item">
                                                <span>Location:</span>
                                                <span className="altf-cost-value">{capitalizeFirst(results.location)}</span>
                                            </div>
                                            <div className="altf-cost-item">
                                                <span>Rate per person:</span>
                                                <span className="altf-cost-value">{formatCurrency(results.altfRatePerPerson)}/month</span>
                                            </div>
                                            <div className="altf-total-cost-line">
                                                <div className="altf-cost-item altf-total-cost">
                                                    <span>Team Total:</span>
                                                    <span>{formatCurrency(results.altfTotalCost)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cost Comparison */}
                                    <div className="altf-cost-comparison-section">
                                        <h3 className="altf-section-title altf-section-title-center">Cost Comparison</h3>
                                        <div className="altf-comparison-grid">
                                            <div className="altf-comparison-card altf-current-cost-card">
                                                <div className="altf-comparison-label">Your Current Cost</div>
                                                {/* currentCostPerPerson should be the sum of per-person costs */}
                                                <div className="altf-comparison-value-red">{formatCurrency(results.monthlyMeetingCostTotal + results.monthlyCafeSpendTotal + results.workspaceCost)}</div>
                                                <div className="altf-comparison-sublabel">per person/month</div>
                                            </div>
                                            <div className="altf-comparison-card altf-altf-cost-card">
                                                <div className="altf-comparison-label">alt.f Cost</div>
                                                <div className="altf-comparison-value-blue">{formatCurrency(results.altfRatePerPerson)}</div>
                                                <div className="altf-comparison-sublabel">per person/month</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Results Summary */}
                                    {/* Calculate current total cost for team and savings based on per-person figures */}
                                    {(() => {
                                        const currentCostPerPerson = results.monthlyMeetingCostTotal + results.monthlyCafeSpendTotal + results.workspaceCost;
                                        const currentTeamTotalCost = currentCostPerPerson * results.teamSize;
                                        const altfTeamTotalCost = results.altfRatePerPerson * results.teamSize;
                                        const savings = currentTeamTotalCost - altfTeamTotalCost;
                                        const savingsPercentage = (currentTeamTotalCost > 0) ? (savings / currentTeamTotalCost) * 100 : 0; // Added check for currentTeamTotalCost > 0

                                        return (
                                            <div className={`altf-results-summary ${savings > 0 ? 'altf-results-summary-positive' : 'altf-results-summary-negative'}`}>
                                                {savings > 0 ? (
                                                    <>
                                                        <div className="altf-summary-headline">You Save With alt.f</div>
                                                        <div className="altf-summary-amount">{formatCurrency(savings)}</div>
                                                        <div className="altf-summary-text">per month for your team</div>
                                                        <div className="altf-summary-percentage">That's {savingsPercentage.toFixed(1)}% less than your current spending!</div>
                                                        <div className="altf-summary-per-person">
                                                            You save {formatCurrency(savings / results.teamSize)} per person monthly
                                                        </div>
                                                        {/* New Buttons */}
                                                        <div className="altf-action-buttons">
                                                            <a
                                                                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(chatSalesMessage)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="altf-action-button altf-chat-sales-button"
                                                                style={{ backgroundColor: 'rgb(37 37 37)' }} // Apply the theme color directly
                                                            >
                                                                <PiWhatsappLogoThin className="whatsapp-icon" /> {/* Use the imported icon */}
                                                                Chat with Sales Executive
                                                            </a>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="altf-summary-headline">Alt.f Costs More</div>
                                                        <div className="altf-summary-amount">{formatCurrency(Math.abs(savings))}</div>
                                                        <div className="altf-summary-text">more per month for your team</div>
                                                        <div className="altf-summary-percentage">That's {Math.abs(savingsPercentage).toFixed(1)}% more than your current spending</div>
                                                        <div className="altf-summary-per-person">
                                                            Additional cost: {formatCurrency(Math.abs(savings) / results.teamSize)} per person monthly
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AltfCostCalculator;