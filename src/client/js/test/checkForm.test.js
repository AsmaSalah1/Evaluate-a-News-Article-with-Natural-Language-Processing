import { handleSubmit } from '../formHandler';
import { checkForName } from '../nameChecker';

// تفعيل mock لـ fetch
global.fetch = require('jest-fetch-mock');

jest.mock('../nameChecker', () => ({
    checkForName: jest.fn()
}));

describe('handleSubmit function', () => {
    beforeEach(() => {
        fetch.resetMocks(); // إعادة ضبط الـ mock قبل كل اختبار
        document.body.innerHTML = `
            <form id="urlForm">
                <input id="name" type="text" value="Test Input"/>
                <button type="submit">Submit</button>
            </form>
            <div id="results"></div>
        `;
    });

    test('should call checkForName with input value', async () => {
        const event = { preventDefault: jest.fn() };
        await handleSubmit(event);

        expect(checkForName).toHaveBeenCalledWith("Test Input");
    });

    test('should send a POST request and update the results div', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Success' }));

        const event = { preventDefault: jest.fn() };
        await handleSubmit(event);

        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/analyze', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: 'Test Input' })
        }));

        expect(document.getElementById('results').innerText).toBe(JSON.stringify({ message: 'Success' }));
    });

    test('should handle fetch error', async () => {
        fetch.mockRejectOnce(new Error('Network error'));

        const event = { preventDefault: jest.fn() };
        await handleSubmit(event);

        expect(document.getElementById('results').innerText).toBe('An error occurred while processing your request.');
    });
});
