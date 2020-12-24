<template>
<div id="post">
    <h3 class="manager-title font-italic">Le coin de publication...</h3>
           
    <article class="publication" v-for="(post, id) in posts" v-bind:key="id">
        <p class="idPost">N° {{post.id}}</p>
        <p class="titlePost">{{post.title}}</p>
        <p class="bodyPost">{{post.body}}</p> 
        
        <img v-bind:src="post.image_URL" />

        <p class="created_datedPost" >Date de publication : {{post.created_date}}</p>
        <button class="btnValidation2" v-on:click="deletePost(post.id)" >Supprimer l'article</button>
    </article>

    
</div>
</template>


<script>
export default {
    name: 'Post',
    data () {
        return{
             posts: [],
             idPost: ''
            }
        },
    mounted(){
    
         //Obtenir tous les posts avec fetch ???
         
      //Obtenir tous les posts
      fetch("http://localhost:3000/api/posts/",  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }})
      .then (response => response.json())
     .then(data=>this.posts = data)

    }, 


    methods: {
           deletePost(id) {
        
            async function postForm() {
    try {
        let response = await fetch("http://localhost:3000/api/posts/" + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            let responseId = await response.json();
            console.log(responseId)
            location.reload();
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
postForm();
   }
  }}
</script>


<style scoped lang="scss">
.btnValidation2{
    background-color: #024601;
    color:#f0e8c7;
    font-weight: bold;
}
#post{
    margin-bottom: 50px;
    color:rgb(41, 119, 71);
}
article{
     border: 2px solid black;
     border-radius: 15px;
     margin-bottom: 100px;
}
p{
    color:rgb(187, 5, 187);
}
</style>