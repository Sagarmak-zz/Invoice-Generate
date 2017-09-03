<template lang="html">
	<div class="add-admin">
		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Add Admin User</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Name</label>
								<div class="control">
									<input v-model="name" v-validate="'required'" name="name" class="input" type="text" placeholder="Name">
								</div>
								<div v-show="errors.has('name')" class="help is-danger">
									The Name is required.
								</div>
							</div>
						</div>
						<div class="column">
							<div class="field">
								<label class="label">Email</label>
								<div class="control">
									<input v-model="email" v-validate="'required|email'" name="email" class="input" type="email" placeholder="Email">
								</div>
								<div v-show="errors.has('email')" class="help is-danger">
									The Email is required.
								</div>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Password</label>
								<div class="control">
									<input v-model="password" v-validate="'required'" name="password" class="input" type="password" placeholder="********">
								</div>
								<div v-show="errors.has('password')" class="help is-danger">
									The Password is required.
								</div>
							</div>
						</div>
						<div class="column">
							<div class="field">
								<label class="label">Confirm Password</label>
								<div class="control">
									<input @keyup.enter="validateAndCreateAdminUser" v-model="confirm" v-validate="'required|confirmed:password'" name="confirm" class="input" type="password" placeholder="********">
								</div>
								<div v-show="errors.has('confirm')" class="help is-danger">
									The Confirm Password should match the Password field.
								</div>
							</div>
						</div>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a @click="validateAndCreateAdminUser" class="button is-success">Add</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->
	</div>
</template>

<script>
import api from '@/api/main';
export default {
	name: 'add-admin',
	data() {
		return {
			name: '',
			email: '',
			password: '',
			confirm: '',
		}
	},
	methods: {
		validateAndCreateAdminUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
					//correct
          // eslint-disable-next-line
					this.createAdminUser();
        }
				else {
					//not correct
					let toast = this.$toasted.error('Please fill in the details.', {
	          theme: "outline",
	          position: "bottom-center",
	          duration : 3000
	        });
				}
      });
    },

		createAdminUser() {
			api.createAdminUser(this.name, this.email, this.password)
			.then(response => {
				if(response.status == 200) {
					//user added
					let toast = this.$toasted.success('Admin User Added.', {
	          theme: "outline",
	          position: "top-center",
	          duration : 3000
	        });
					this.$bus.$emit('add-admin-close');
				}
			})
			.catch(error => {
				console.log(error);
			})
		}
	}
}
</script>

<style lang="scss">
.add-admin {
	z-index: 1025;
}
</style>
