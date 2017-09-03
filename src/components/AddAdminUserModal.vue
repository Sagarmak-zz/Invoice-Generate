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
									<input class="input" type="text" placeholder="Name">
								</div>
							</div>
						</div>
						<div class="column">
							<div class="field">
								<label class="label">Email</label>
								<div class="control">
									<input class="input" type="email" placeholder="Email">
								</div>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Password</label>
								<div class="control">
									<input class="input" type="password" placeholder="********">
								</div>
							</div>
						</div>
						<div class="column">
							<div class="field">
								<label class="label">Confirm Password</label>
								<div class="control">
									<input class="input" type="password" placeholder="********">
								</div>
							</div>
						</div>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Add</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->
	</div>
</template>

<script>
export default {
	name: 'add-admin',
	data() {
		return {
			name: '',
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
.add-admin {
	z-index: 1025;
}
</style>
