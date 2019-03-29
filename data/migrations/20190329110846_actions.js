
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('actions', function(tbl) {
           
            // primary key, called id, auto increments
        tbl.increments();
    
            // description column, required/
        tbl
            .string('description', 128)
            .notNullable()
            .unique();

             // notes column, not required
        tbl
            .string('notes', 256)
           
            // action completed column
        tbl.boolean('completed')

        // foreign key
        tbl
            .integer('project_id') // the column name in this table (users)
            .unsigned()
            .references('id') // primary key in the related (parent) table (roles)
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
      });
    };
    

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');

};
