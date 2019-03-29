
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(tbl) {
            // primary key, called id, auto-increments
        tbl.increments();
    
            // name column, required/
        tbl
          .string('name', 128)
          .notNullable()
          .unique();
    
            // description column, not required
        tbl
          .string('description', 256)
          .unique();
    
            // project completed? column
        tbl.boolean('completed')

        
    
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
