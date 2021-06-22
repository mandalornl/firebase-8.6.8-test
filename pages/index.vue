<template>
  <div>
    <code style="white-space: pre-wrap">{{ items }}</code><br>
    <button
      :disabled="pending"
      @click="create"
    >
      Create
    </button>
  </div>
</template>

<script>
  export default {
    data: () => ({
      pending: false,
      items: [],
      unsubscribe: null
    }),

    mounted() {
      this.unsubscribe = this.$firestore
        .collection('test')
        .onSnapshot({
          includeMetadataChanges: true
        }, (snapshot) => {
          snapshot.docChanges().forEach(({
            type,
            doc
          }) => {
            if (type === 'added') {
              this.items.push({
                id: doc.id,
                ...doc.metadata,
                ...doc.data()
              });
            } else {
              const index = this.items.findIndex(({ id }) => id === doc.id);

              if (type === 'modified') {
                this.items.splice(index, 1, {
                  id: doc.id,
                  ...doc.metadata,
                  ...doc.data()
                });
              } else {
                this.items.splice(index, 1);
              }
            }
          });
        });
    },

    beforeDestroy() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    },

    methods: {
      async create() {
        this.pending = true;

        const ref = await this.$firestore.collection('test').add({
          createdAt: this.$firebase.firestore.Timestamp.now()
        });

        await ref.update({
          updatedAt: this.$firebase.firestore.Timestamp.now()
        });

        setTimeout(() => {
          this.pending = false
        }, 200);
      }
    }
  }
</script>
