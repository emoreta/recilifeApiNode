/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     17/5/2022 20:12:49                           */
/*==============================================================*/


drop table dbo.calification;

drop table dbo.day;

drop table dbo.location_user;

drop table dbo.recyclable_material;

drop table dbo.request;

drop table dbo.request_recyclable_material;

drop table dbo.schedule;

drop table dbo.session_type;

drop table dbo.state;

drop table dbo.template_email;

drop table dbo."user";

drop table dbo.user_location;

drop table dbo.user_schedule;

drop table dbo.user_type;

drop user dbo;

/*==============================================================*/
/* User: dbo                                                    */
/*==============================================================*/
create user dbo;

/*==============================================================*/
/* Table: calification                                          */
/*==============================================================*/
create table dbo.calification (
   id                   INT4                 not null,
   name                 VARCHAR(50)          null,
   punctuation          INT4                 null,
   active               BOOL                 null,
   created              DATE                 null,
   constraint PK_calification primary key (id)
);

-- set table ownership
alter table dbo.calification owner to dbo
;
/*==============================================================*/
/* Table: day                                                   */
/*==============================================================*/
create table dbo.day (
   id                   INT4                 not null,
   name                 VARCHAR(70)          null,
   description          VARCHAR(500)         null,
   active               BOOL                 null,
   constraint PK_day primary key (id)
);

-- set table ownership
alter table dbo.day owner to dbo
;
/*==============================================================*/
/* Table: location_user                                         */
/*==============================================================*/
create table dbo.location_user (
   id                   NUMERIC(18,0)        not null,
   latitude             VARCHAR(1000)        null,
   longitude            VARCHAR(1000)        null,
   description          VARCHAR(5000)        null,
   reference            VARCHAR(5000)        null,
   active               BOOL                 null,
   created              DATE                 null,
   constraint PK_location_user primary key (id)
);

-- set table ownership
alter table dbo.location_user owner to dbo
;
/*==============================================================*/
/* Table: recyclable_material                                   */
/*==============================================================*/
create table dbo.recyclable_material (
   id                   INT4                 not null,
   name                 VARCHAR(100)         null,
   description          VARCHAR(500)         null,
   active               BOOL                 null,
   constraint PK_recyclable_material primary key (id)
);

-- set table ownership
alter table dbo.recyclable_material owner to dbo
;
/*==============================================================*/
/* Table: request                                               */
/*==============================================================*/
create table dbo.request (
   id                   NUMERIC(18,0)        not null,
   id_user_request      NUMERIC(18,0)        null,
   id_user_recycler     NUMERIC(18,0)        null,
   distance             VARCHAR(50)          null,
   amount               MONEY                null,
   id_state             INT4                 null,
   created              DATE                 null,
   updated              DATE                 null,
   calification         INT4                 null,
   commentary           VARCHAR(1)           null,
   id_state_recycler    INT4                 null,
   constraint PK_request primary key (id)
);

-- set table ownership
alter table dbo.request owner to dbo
;
/*==============================================================*/
/* Table: request_recyclable_material                           */
/*==============================================================*/
create table dbo.request_recyclable_material (
   id                   INT4                 not null,
   id_recyclable_material INT4                 null,
   id_request           NUMERIC(18,0)        null,
   constraint PK_request_recyclable_material primary key (id)
);

-- set table ownership
alter table dbo.request_recyclable_material owner to dbo
;
/*==============================================================*/
/* Table: schedule                                              */
/*==============================================================*/
create table dbo.schedule (
   id                   INT4                 not null,
   start_schedule       TIME                 null,
   end_schedule         TIME                 null,
   description          VARCHAR(1500)        null,
   active               BOOL                 null,
   id_user              NUMERIC(18,0)        null,
   id_day               INT4                 null,
   constraint PK_schedule primary key (id)
);

-- set table ownership
alter table dbo.schedule owner to dbo
;
/*==============================================================*/
/* Table: session_type                                          */
/*==============================================================*/
create table dbo.session_type (
   id                   INT4                 not null,
   name                 VARCHAR(60)          null,
   description          VARCHAR(500)         null,
   constraint PK_session_type primary key (id)
);

-- set table ownership
alter table dbo.session_type owner to dbo
;
/*==============================================================*/
/* Table: state                                                 */
/*==============================================================*/
create table dbo.state (
   id                   INT4                 not null,
   name                 VARCHAR(150)         null,
   description          VARCHAR(500)         null,
   field                VARCHAR(500)         null,
   active               BOOL                 null,
   constraint PK_state primary key (id)
);

-- set table ownership
alter table dbo.state owner to dbo
;
/*==============================================================*/
/* Table: template_email                                        */
/*==============================================================*/
create table dbo.template_email (
   id                   INT4                 not null,
   name                 VARCHAR(150)         null,
   description          VARCHAR(5000)        null,
   template             TEXT                 null,
   active               CHAR(10)             null,
   constraint PK_template_email primary key (id)
);

-- set table ownership
alter table dbo.template_email owner to dbo
;
/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table dbo."user" (
   id                   SERIAL not null,
   name                 VARCHAR(50)          null,
   last_name            VARCHAR(50)          null,
   email                VARCHAR(150)         null,
   password             VARCHAR(500)         null,
   created              DATE                 null,
   active               BOOL                 null,
   id_session_type      INT4                 null,
   id_user_type         INT4                 null,
   image                VARCHAR(1)           null,
   bussines_name        VARCHAR(500)         null,
   identification_ruc   VARCHAR(13)          null,
   telephone            VARCHAR(50)          null,
   mobile_number        VARCHAR(50)          null,
   calification         INT4                 null,
   updated              DATE                 null,
   user_id              VARCHAR(50)          null,
   token                VARCHAR(1)           null,
   field1               VARCHAR(1)           null,
   field2               VARCHAR(1)           null,
   constraint PK_user primary key (id)
);

-- set table ownership
alter table dbo."user" owner to dbo
;
/*==============================================================*/
/* Table: user_location                                         */
/*==============================================================*/
create table dbo.user_location (
   id                   NUMERIC(18,0)        not null,
   id_user              NUMERIC(18,0)        null,
   id_location          NUMERIC(18,0)        null,
   active               BOOL                 null,
   constraint PK_user_location primary key (id)
);

-- set table ownership
alter table dbo.user_location owner to dbo
;
/*==============================================================*/
/* Table: user_schedule                                         */
/*==============================================================*/
create table dbo.user_schedule (
   id                   SERIAL not null,
   id_user              NUMERIC(18,0)        null,
   id_schedule          INT4                 null,
   constraint PK_user_schedule primary key (id)
);

-- set table ownership
alter table dbo.user_schedule owner to dbo
;
/*==============================================================*/
/* Table: user_type                                             */
/*==============================================================*/
create table dbo.user_type (
   id                   INT4                 not null,
   name                 VARCHAR(50)          null,
   description          VARCHAR(500)         null,
   constraint PK_user_type primary key (id)
);

-- set table ownership
alter table dbo.user_type owner to dbo
;
alter table request
   add constraint FK_request_state foreign key (id_state)
      references state (id);

alter table request
   add constraint FK_request_user foreign key (id_user_request)
      references "user" (id);

alter table request
   add constraint FK_request_user1 foreign key (id_user_recycler)
      references "user" (id);

alter table request_recyclable_material
   add constraint FK_re_rec_material foreign key (id_recyclable_material)
      references recyclable_material (id);

alter table request_recyclable_material
   add constraint FK_req_rec_mat_request foreign key (id_request)
      references request (id);

alter table schedule
   add constraint FK_schedule_day foreign key (id_day)
      references day (id);

alter table "user"
   add constraint FK_user_session_type foreign key (id_session_type)
      references session_type (id);

alter table "user"
   add constraint FK_user_user_type foreign key (id_user_type)
      references user_type (id);

alter table user_location
   add constraint FK_user_location_location_user foreign key (id_location)
      references location_user (id);

alter table user_location
   add constraint FK_user_location_user foreign key (id_user)
      references "user" (id);

alter table user_schedule
   add constraint FK_user_schedule_schedule foreign key (id_schedule)
      references schedule (id);

alter table user_schedule
   add constraint FK_user_schedule_user foreign key (id_user)
      references "user" (id);

