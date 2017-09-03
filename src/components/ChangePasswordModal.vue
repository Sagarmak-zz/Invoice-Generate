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
							<input v-model="user_email" class="input" type="email" placeholder="Email">
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input class="input" type="password" placeholder="********">
						</div>
					</div>

					<div class="field">
						<label class="label">Confirm Password</label>
						<div class="control">
							<input class="input" type="password" placeholder="********">
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Update</a>
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
