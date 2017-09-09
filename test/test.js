const assert = require('assert');
const multiguard = require('../index.js');

describe('multiguard(guards)', function() {
    it('should throw an error when the argument is not an array', function(done) {
        assert.throws(() => multiguard({}), Error, 'You must specify an array of guards');
        done();
    });

    describe('should call next with', function() {
        it('undefined when the argument is an empty array', function(done) {
            const guard = multiguard([])
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, undefined);
                done();
            });
        });

        it('undefined when the only guard calls next with undefined', function(done) {
            const guard = multiguard([
                (to, from, next) => next(),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, undefined);
                done();
            });
        });

        it('whatever value the only guard calls next with', function(done) {
            const expected = {name: 'example.route.name'};
            const guard = multiguard([
                (to, from, next) => next(expected),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, expected);
                done();
            });
        });

        it('undefined when all guards pass', function(done) {
            const guard = multiguard([
                (to, from, next) => next(),
                (to, from, next) => next(),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, undefined);
                done();
            });
        });

        it('the value of the first guard when it is not undefined', function(done) {
            const expected = {name: 'example.route.name'};
            const guard = multiguard([
                (to, from, next) => next(expected),
                (to, from, next) => next(),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, expected);
                done();
            });
        });

        it('the value of the second guard when it is not undefined', function(done) {
            const expected = {name: 'example.route.name'};
            const guard = multiguard([
                (to, from, next) => next(),
                (to, from, next) => next(expected),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, expected);
                done();
            });
        });

        it('the value of the first guard to call next with a non-undefined value', function(done) {
            const expected = {name: 'example.route.name'};
            const unexpected = {name: 'example.route.name.2'};
            const guard = multiguard([
                (to, from, next) => next(),
                (to, from, next) => next(expected),
                (to, from, next) => next(unexpected),
            ]);
            guard(null, null, (nextArg) => {
                assert.equal(nextArg, expected);
                done();
            });
        });
    });

    it('should not call the second guard when the first guard calls next with a non-undefined value', function(done) {
        const expected = {name: 'example.route.name'};
        const guard = multiguard([
            (to, from, next) => next(expected),
            (to, from, next) => assert.fail('Second guard called when it shouldn\'t have been'),
        ]);
        guard(null, null, (nextArg) => {
            assert.equal(nextArg, expected);
            done();
        });
    });
});