<template>
<div class="formulaire">
    <form class="form" encType="multipart/form-data">
        <div class="form-group">
            <label for="title">Titre</label>
            <input type="text" class="form-control" id="title" v-model="title" max-length=50 required>
        </div>

        <div class="form-group">
            <label for="body">Contenu</label>
            <textarea class="form-control" id="body" v-model="body" rows=5 cols=33 required placeholder="Ecrire un article ou partagez un lien vers un article de votre choix..."></textarea>
        </div>

        <div class="form-group">
            <label for="image_URL">Image</label>
            <input type="file" class="form-control" id="image_URL" @change= "setSelectedImage" max-length=50 required>
        </div>

        <button type="submit" class="btnValidation" v-on:click.prevent="createPost">Partager</button>
    </form>
</div>
</template>


<script>
export default {
    name: 'CreatePostForm',
    data () {
        return {
            title: '',
            body: '',
            selectedImage: 'NULL'
        }
    },
    methods:{
        setSelectedImage(event){
   this.selectedImage = event.target.files[0]
},
        createPost() {
            let idUser = parseInt(localStorage.getItem("Id"));
            let dataForm = { id_users: idUser, title: this.title, body: this.body, userId: 0};
            let jsonDataForm = JSON.stringify(dataForm)
            let formData = new FormData()
            formData.append("image", this.selectedImage);
            formData.append("post", jsonDataForm);
            console.log(dataForm)

            async function postForm(dataToSend) {
                try {
                    let response = await fetch("http://localhost:3000/api/posts/", {
                        method: 'POST',
                        headers: {
                            //'content-type': 'application/x-www-form-urlencoded', supprimer cette ligne
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: dataToSend,
                    });
                        if (response.ok) {
                            let responseId = await response.json();
                            window.location.href = " http://localhost:8080/signup#/allpost";
                            console.log(responseId);
                        } else {
                            console.error('Retour du serveur : ', response.status);
                        }
                } catch (e) {
                console.log(e);
                }
            }
        postForm(formData);
        }
    }
}
</script>

<style scoped lang="scss">
.btnValidation{
    background-color: #024601;
    color:#f0e8c7;
    font-weight: bold;
}
.form-group{
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
}
label{
    color:black;
}

 @media all and (max-width: 599px)
  {
      .formulaire{
          margin-bottom:50px;
      }
  }
</style>