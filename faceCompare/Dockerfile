FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY style.css .
COPY index.html .
COPY js/index.js ./js/  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

