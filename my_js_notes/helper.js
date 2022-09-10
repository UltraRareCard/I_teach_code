//sleep(ms), range(from,to), random_generator,

const random = function(from = 0, to) {
    return Math.floor(Math.random() * (to - from + 1) - from);
};