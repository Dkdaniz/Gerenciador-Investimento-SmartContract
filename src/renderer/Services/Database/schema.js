module.exports = `
    create table if not exists contracts (
        \`id\` integer primary key autoincrement,
        \`customer\` varchar not null,
        \`transaction\` varchar not null,
        \`number\` varchar,
        \`address\` varchar,
        \`status\` varchar not null,
        'createdAt' datetime default CURRENT_TIMESTAMP,
        'updatedAt' datetime default CURRENT_TIMESTAMP
    );
`;