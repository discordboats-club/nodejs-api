interface Bases {
    bot: string;
    user: string;

    [propName: string]: string;
}

const bases: Bases = {
    bot: '/bot',
    user: '/user'
};

export { bases };