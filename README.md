**Create New Project**
		composer create-project symfony/website-skeleton TodoApp

		* Run your application:
			1. Go to the project directory
			2. Create your code repository with the git init command
			3. Download the Symfony CLI at https://symfony.com/download to install a development web server

		* Read the documentation at https://symfony.com/doc

		* You're ready to send emails.

		* If you want to send emails via a supported email provider, install
			the corresponding bridge.
			For instance, composer require mailgun-mailer for Mailgun.

		* If you want to send emails asynchronously:

			1. Install the messenger component by running composer require messenger;
			2. Add 'Symfony\Component\Mailer\Messenger\SendEmailMessage': amqp to the
			config/packages/messenger.yaml file under framework.messenger.routing
			and replace amqp with your transport name of choice.

		* Read the documentation at https://symfony.com/doc/master/mailer.html

								
		Database Configuration 
								

		* Modify your DATABASE_URL config in .env

		* Configure the driver (mysql) and
			server_version (5.7) in config/packages/doctrine.yaml
					
		How to test? 

		* Write test cases in the tests/ folder
		* Run php bin/phpunit
	
	composer require encore // install plugin to work with React
		Then enable
		.enableReactPreset()
		in webpack.config.js


**Database**
	sudo apt install sqlite // install sqlite
	sqlite3 todoapp // command to create database

	**SQLite**
		.databases // show databases
		.quit // exit DB shell

		DATABASE_URL="sqlite:///home/yuriy/Workspace/Sandbox/symfony5/TodoApp/todoapp" // .env.local changed DB connect line !!! DID NOT WORKED OUT!
		
		DATABASE_URL="sqlite:///%kernel.project_dir%/todoapp.db" // this was correct one

		php bin/console make:migration

		* View table content *
			sqlite> .header on
			sqlite> .mode column
			sqlite> pragma table_info(todo)

		* Add data *
			insert into todo values(1, 'Learn something new and usefull');

		* View data *
			select * from todo;

		* Drop table *
			delete from todo;


**React**
		install:
			yarn add @babel/preset-react --dev
			yarn add react react-dom prop-types

**Dev server**
		yarn encore dev --watch
		/home/yuriy/.symfony/bin/symfony server:start // or symfony server:start if symfony is set globally

**PHP**
		php --ini //displays loaded ini file and it's path

**Entity**

		create: 
			php bin/console make:entity
		
		update:
			same command, with entity name mentioned right after make or in the next question
			please do not forget to make migration after updating entity:
				php bin/console make:migration
			and apply it afterwards
				php bin/console doctrine:migrations:migrate
		NOTE:
			sqlite don't let to create NOT NULL column with empty cells. So you have to let it be null or to provide default value

**FORM**

		create:
			php bin/console make:from
			This creates class and entity. Entity name should be uppercase