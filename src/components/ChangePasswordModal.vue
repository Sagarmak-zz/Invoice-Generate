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
							<input class="input" type="email" placeholder="Email">
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
export default {
	name: 'change-password',
	data() {
		return {
			email: '',
			password: '',
			confirm: ''
		}
	},
	methods: {

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
