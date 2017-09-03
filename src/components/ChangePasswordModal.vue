<template lang="html">
	<div class="change-password">
		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Change Password</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input disabled v-model="user_email" name="email" class="input" type="email" placeholder="Email">
						</div>
						<div v-show="errors.has('email')" class="help is-danger">
							The Email is required.
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input v-validate="'required'" v-model="password" name="password" class="input" type="password" placeholder="********">
						</div>
						<div v-show="errors.has('password')" class="help is-danger">
							The Password is required.
						</div>
					</div>

					<div class="field">
						<label class="label">Confirm Password</label>
						<div class="control">
							<input v-validate="'required|confirmed:password'" v-model="confirm" @keyup.enter="validateAndUpdateAdminPassword" name="confirm" class="input" type="password" placeholder="********">
						</div>
						<div v-show="errors.has('confirm')" class="help is-danger">
							The Confirm Password should match the Password field.
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<a @click="validateAndUpdateAdminPassword" class="button is-success">Update</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->
	</div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
export default {
	name: 'change-password',
	created() {
		this.callUser();
	},
	data() {
		return {
			email: '',
			password: '',
			confirm: '',
			user_email: ''
		}
	},
	methods: {
		validateAndUpdateAdminPassword() {
      this.$validator.validateAll().then((result) => {
        if (result) {
					//correct
          // eslint-disable-next-line
					this.updatePassword();
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

		updatePassword() {
			api.updateAdminPassword(this.password)
			.then(response => {
				if(response.data = "Password successfully updated") {
					let toast = this.$toasted.success('Password updated successfully!', {
	          theme: "outline",
	          position: "top-center",
	          duration : 3000
	        });
					this.$bus.$emit('password-changed');
				}
			})
			.catch(error => {
				console.log(error);
			})
		},

		callUser() {
			api.userDetails()
			.then((response) => {
				this.user_email = response.data.user_email;
			})
			.catch((error) => {
				console.log(error);
			})
		},
	}
}
</script>

<style lang="scss">
.change-password {
	.field {
		.label {
			width: 0;
		}
	}
}
</style>
