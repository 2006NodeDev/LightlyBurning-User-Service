create schema lightlyburning_user_service;
set schema 'lightlyburning_user_service';



-- run the entire script to regenerate the ddl

drop table users;
drop table roles;


create table roles(
	"role_id" text primary key,
	"role" text
);

-- some tables have dependencies on others and we should make those others first
create table users (
	"user_id" text primary key,
	"username" text not null unique,
	"email" text unique,
	"role" text references roles ("role_id"), --fk to a role table
	"image" text
);



insert into roles ("role_id", "role")
	values ('rol_GPgBwh5xGfKCeO5V', 'Admin'),
		   ('rol_H0U7poZ5OgwKHCsL', 'User');
		  
insert into users 
	values ('auth0|5f2db1f5257b000038e4aaaf', 'alec', '2006nodedev@gmail.com', 'rol_GPgBwh5xGfKCeO5V', null)
