create table users (
    id bigint(20) not null auto_increment,
    name varchar(40) not null,
    username varchar(15) not null,
    email varchar(40) not null,
    password varchar(100) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key (id),
    unique key uk_users_username (username),
    unique key uk_users_email (email)
) engine=InnoDB default charset=utf8;

create table roles (
    id bigint(20) not null auto_increment,
    name varchar(60) not null,
    primary key (id),
    unique key uk_roles_name (name)
) engine=InnoDB default charset=utf8;

create table user_roles (
    user_id bigint(20) not null,
    role_id bigint(20) not null,
    primary key (user_id, role_id),
    key fk_user_roles_role_id (role_id),
    constraint fk_user_roles_role_id foreign key (role_id) references roles(id),
    constraint fk_user_roles_user_id foreign key (user_id) references users(id)
) engine=InnoDB default charset=utf8;

create table polls (
    id bigint(20) auto_increment,
    question varchar(140) not null,
    expiration_date_time datetime not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    created_by bigint(20) default null,
    updated_by bigint(20) default null,
    primary key (id)
) engine=InnoDB default charset=utf8;

create table choices (
    id bigint(20) not null auto_increment,
    text varchar(40) not null,
    poll_id bigint(20) not null,
    primary key (id),
    key fk_choices_poll_id (poll_id),
    constraint fk_choices_poll_id foreign key (poll_id) references polls(id)
) engine=InnoDB default charset=utf8;

create table votes (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    user_id bigint(20) not null,
    poll_id bigint(20) not null,
    choice_id bigint(20) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key (id),
    key fk_votes_user_id (user_id),
    key fk_votes_poll_id (poll_id),
    key fk_votes_choice_id (choice_id),
    constraint fk_votes_user_id foreign key (user_id) references users(id),
    constraint fk_votes_poll_id foreign key (poll_id) references polls(id),
    constraint fk_votes_choice_id foreign key (choice_id) references choices(id)
) engine=InnoDB default charset=utf8;