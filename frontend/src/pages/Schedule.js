import React, { useEffect } from 'react';

const Schedule = () => {
    useEffect(() => {
        document.querySelectorAll('td').forEach(cell => {
            // Set initial event listeners for each cell
            setupCell(cell);
        });
    }, []);

    const setupCell = (cell) => {
        // Add event listener for clicking the cell to add an input field
        cell.addEventListener('click', function () {
            highlightCell(cell);
        });

        // Add hover events to show/hide icons
        cell.addEventListener('mouseenter', function () {
            showSVGIcons(cell);
        });
        cell.addEventListener('mouseleave', function () {
            hideSVGIcons(cell);
        });
    };

    const highlightCell = (cell) => {
        // Only add input if it doesn't already exist
        if (!cell.querySelector('input')) {
            addInput(cell);
        }
    };

    const addInput = (cell) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter text...';
        cell.textContent = '';  // Clear the cell text
        cell.appendChild(input);

        // Focus on input field when added
        input.focus();

        // Handle focus loss (blur event)
        input.addEventListener('blur', function () {
            handleInputChange(cell, input);
        });

        // Handle keydown (Enter key)
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                handleInputChange(cell, input);
            }
        });
    };

    const handleInputChange = (cell, input) => {
        const inputValue = input.value.trim();

        // Update the cell's text content with the input value and remove input element
        if (inputValue) {
            cell.textContent = inputValue;
        } else {
            cell.textContent = '';  // Clear the cell if input is empty
        }

        // Change background color to a random color
        const randomColor = getRandomColor();
        cell.style.backgroundColor = randomColor;

        // Re-add SVG icons after the input is removed
        addSVGIcons(cell);
    };

    const addSVGIcons = (cell) => {
        // Remove existing icons if present
        removeExistingIcons(cell);

        // Add right arrow (expand) and 'X' (remove) icons
        const expandSVG = createExpandSVG(cell.offsetHeight);
        const removeSVG = createRemoveSVG(cell.offsetHeight);

        expandSVG.classList.add('icon');  // Add a class for easy control
        removeSVG.classList.add('icon');  // Add a class for easy control

        // Position and append icons
        expandSVG.style.position = 'absolute';
        expandSVG.style.top = '50%';
        expandSVG.style.right = '5px';  // Adjusted position
        expandSVG.style.transform = 'translateY(-50%)';
        expandSVG.style.cursor = 'pointer';

        removeSVG.style.position = 'absolute';
        removeSVG.style.top = '5px';  // Adjusted position
        removeSVG.style.left = '5px';  // Adjusted position
        removeSVG.style.cursor = 'pointer';

        cell.style.position = 'relative';  // Make the cell position relative for correct icon placement
        cell.appendChild(expandSVG);
        cell.appendChild(removeSVG);

        // Add event listeners for expanding and removing cells
        expandSVG.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent cell click event from triggering
            expandCell(cell);
        });

        removeSVG.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent cell click event from triggering
            resetCell(cell);
        });

        // Initially hide icons
        hideSVGIcons(cell);
    };

    const createExpandSVG = (height) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', height / 3);  // Smaller icon size
        svg.setAttribute('height', height / 3);
        svg.setAttribute('viewBox', '0 0 100 100');

        // Right arrow shape for expanding
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M30 10 L70 50 L30 90 Z');  // Right arrow
        path.setAttribute('fill', 'black');
        svg.appendChild(path);

        return svg;
    };

    const createRemoveSVG = (height) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', height / 3);  // Smaller icon size
        svg.setAttribute('height', height / 3);
        svg.setAttribute('viewBox', '0 0 100 100');

        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '10');
        line1.setAttribute('y1', '10');
        line1.setAttribute('x2', '90');
        line1.setAttribute('y2', '90');
        line1.setAttribute('stroke', 'black');
        line1.setAttribute('stroke-width', '10');

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '90');
        line2.setAttribute('y1', '10');
        line2.setAttribute('x2', '10');
        line2.setAttribute('y2', '90');
        line2.setAttribute('stroke', 'black');
        line2.setAttribute('stroke-width', '10');

        svg.appendChild(line1);
        svg.appendChild(line2);

        return svg;
    };

    const removeExistingIcons = (cell) => {
        const existingIcons = cell.querySelectorAll('.icon');
        existingIcons.forEach(icon => icon.remove());
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const expandCell = (cell) => {
        let currentColspan = cell.getAttribute('colspan') ? parseInt(cell.getAttribute('colspan')) : 1;
        const maxExpand = 4;

        if (currentColspan < maxExpand) {
            // Hide the next visible cell when expanding
            let nextCell = cell.nextElementSibling;
            
            // Find the next non-hidden cell
            while (nextCell && nextCell.style.display === 'none') {
                nextCell = nextCell.nextElementSibling;
            }

            if (nextCell) {
                nextCell.style.display = 'none';  // Hide the next visible cell
                cell.setAttribute('colspan', currentColspan + 1);
            }
        }
    };

    const resetCell = (cell) => {
        let currentColspan = cell.getAttribute('colspan') ? parseInt(cell.getAttribute('colspan')) : 1;

        // Reset colspan to 1
        if (currentColspan > 1) {
            let sibling = cell.nextElementSibling;
            for (let i = 1; i < currentColspan; i++) {
                if (sibling) {
                    sibling.style.display = 'table-cell';  // Show hidden cells
                    sibling = sibling.nextElementSibling;
                }
            }
            cell.setAttribute('colspan', 1);
        }

        // Reset background color to white (or default)
        cell.style.backgroundColor = '';

        // Clear the cell content
        cell.textContent = '';
    };

    const showSVGIcons = (cell) => {
        // Show the SVG icons when the cell is highlighted
        const icons = cell.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.style.display = 'block';
        });
    };

    const hideSVGIcons = (cell) => {
        // Hide the SVG icons when the cell is not highlighted
        const icons = cell.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.style.display = 'none';
        });
    };

    return (
        <div className="container">
            <h1>Schedule</h1>
            <div id="schedule-section" className="choice-section">
                <h3>Enter Your Weekly Schedule</h3>
                <table id="schedule-table">
                    <thead>
                        <tr>
                            <th></th> {/* Empty cell for the top-left corner */}
                            <th>08:00</th>
                            <th>09:00</th>
                            <th>10:00</th>
                            <th>11:00</th>
                            <th>12:00</th>
                            <th>13:00</th>
                            <th>14:00</th>
                            <th>15:00</th>
                            <th>16:00</th>
                            <th>17:00</th>
                            <th>18:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Monday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <th>Tuesday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <th>Wednesday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <th>Thursday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <th>Friday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <th>Saturday</th>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;