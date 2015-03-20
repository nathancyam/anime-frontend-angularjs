jest.dontMock('../AnnStaffTable.jsx');

describe('AnnStaffTable component', function () {
    it('should show the staff table', function () {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var AnnStaffTable = require('../AnnStaffTable.jsx');

        var cast = [
            {
                character: "Sengoku Nadeko",
                seiyuu: "Kana Hanazawa"
            }
        ];

        var staffComponent = TestUtils.renderIntoDocument(
            <AnnStaffTable cast={cast} />
        );

        var characterTag = TestUtils.findRenderedDOMComponentWithClass(
            staffComponent, 'character');
        var seiyuuTag = TestUtils.findRenderedDOMComponentWithClass(
            staffComponent, 'seiyuu');

        expect(characterTag.getDOMNode().textContent).toEqual('Sengoku Nadeko');
        expect(seiyuuTag.getDOMNode().textContent).toEqual('Kana Hanazawa');
    });
});