const expect = require("chai").expect; // eslint-disable-line node/no-unpublished-require

const Formatter = require("../lib/Formatter.js");

/* eslint-disable no-unused-vars */
describe("Formatter", function() {
    describe("::from_template()", function() {
        it("Default to just the string", function() {
            const f = Formatter.from_template("");
            expect(f.keys).to.be.an("array");
            expect(f.keys.length).to.equal(1);
            expect(f.keys[0]).to.equal("STRING");
            expect(f.template).to.equal(":STRING");
        });
        it("Successfully adds STRING onto end", function() {
            const f = Formatter.from_template("this is a test");
            expect(f.keys).to.be.an("array");
            expect(f.keys.length).to.equal(1);
            expect(f.keys[0]).to.equal("STRING");
            expect(f.template).to.equal("this is a test:STRING");
        });
        it("Doesn't append STRING if included", function() {
            const f = Formatter.from_template("this is a :STRING too");
            expect(f.keys).to.be.an("array");
            expect(f.keys.length).to.equal(1);
            expect(f.keys[0]).to.equal("STRING");
            expect(f.template).to.equal("this is a :STRING too");
        });
        it("Can parse extra arg", function() {
            const f = Formatter.from_template(":ISO - this is a test");
            expect(f.keys).to.be.an("array");
            expect(f.keys.length).to.equal(2);
            expect(f.keys[0]).to.equal("ISO");
            expect(f.keys[1]).to.equal("STRING");
            expect(f.template).to.equal(":ISO - this is a test:STRING");
        });
    });
    describe("#format()", function() {
        it("Just returns default", function() {
            const f = Formatter.from_template();
            expect(f.format("test")).to.equal("test");
        });
        it("Can prepend", function() {
            const f = Formatter.from_template("Some text: ");
            expect(f.format("test")).to.equal("Some text: test");
        });
        it("Can embbed", function() {
            const f = Formatter.from_template("Some :STRING text to");
            expect(f.format("test")).to.equal("Some test text to");
        });
        it("Add arguments", function() {
            const f = Formatter.from_template(":ISO - Some :STRING text to");
            expect(f.format("test", {ISO:"a"})).to.equal("a - Some test text to");
        });
    });
});
/* eslint-enable no-unused-vars */
