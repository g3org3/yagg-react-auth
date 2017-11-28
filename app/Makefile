make:
	NODE_PATH=./src yarn build
	tar -czf dist.gz build
	cp ./dist.gz /Users/george/Documents/github-open-source/auth-server/dist.gz
	cd /Users/george/Documents/github-open-source/auth-server && tar -xzf dist.gz
	rm -fr /Users/george/Documents/github-open-source/auth-server/public
	mv /Users/george/Documents/github-open-source/auth-server/build /Users/george/Documents/github-open-source/auth-server/public
	mv /Users/george/Documents/github-open-source/auth-server/public/index.html /Users/george/Documents/github-open-source/auth-server/views/index.ejs 

clean:
	rm -fr build
	rm -fr dist.gz