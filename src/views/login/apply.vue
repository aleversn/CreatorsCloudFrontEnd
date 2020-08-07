<template>
	<div class="apply-block">
		<transition name="scale-up-to-up">
			<fv-progress-bar
				v-show="Apply.Lock"
				:loading="true"
				foreground="#FF8B00"
				style="position: absolute; left: 0px; top: 0px; width: 100%;"
			></fv-progress-bar>
		</transition>
		<div class="d-1">
			<p>创建一个新的账户</p>
			<p>通过创建用户来获得Creators Cloud的全部体验</p>
		</div>
		<div class="main-block">
			<div class="s1">
				<fv-text-box
					v-model="Form.UserName"
					placeholder="手机号 (+86)"
					borderWidth="2"
					:revealBorder="true"
					border-color="transparent"
					focusBorderColor="transparent"
					background="whitesmoke"
                    borderRadius="5"
					style="width: 90%; min-height: 50px; margin-top: 45px;"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-text-box
					v-model="Form.Email"
					placeholder="Email (someone@example.com)"
					borderWidth="2"
					:revealBorder="true"
					border-color="transparent"
					focusBorderColor="transparent"
					background="whitesmoke"
                    borderRadius="5"
					style="width: 90%; min-height: 50px; margin-top: 15px;"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-text-box
					placeholder="密码 (不少于8位,且必须包含数字和英文字母)"
					v-model="Form.Password"
					type="password"
					borderWidth="2"
					:revealBorder="true"
					border-color="transparent"
					focusBorderColor="transparent"
					background="whitesmoke"
                    borderRadius="5"
					style="width: 90%; min-height: 50px; margin-top: 15px;"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-button
					background="rgba(0, 120, 212, 1)"
					theme="dark"
					borderRadius="50"
					fontSize="16"
					fontWeight="600"
					style="width: 50px; height: 50px; margin-top: 20px;"
					:disabled="Apply.Lock"
					@click="handleApply"
				>
					<p class="ms-Icon ms-Icon--ChevronRight"></p>
				</fv-button>
				<div class="s2">
					<p class="to-apply">当用户注册时, 我们默认用户同意本网站的隐私政策和服务条款</p>
					<p class="to-apply" style="margin: 0px 8px;">·</p>
					<p class="to-apply">隐私政策</p>
					<p class="to-apply" style="margin: 0px 8px;">·</p>
					<p class="to-apply">服务条款</p>
				</div>
			</div>
		</div>
		<div class="s3" @click="$Go('/login')">
			<p>已有帐号了? 登录</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.apply-block {
	@include FullRelative;
	@include HcenterVcenterC;

	flex: 1;

	.d-1 {
		@include HcenterVcenterC;

		height: 150px;

		p {
			&:first-child {
				@include ms-fontSize-28;

				color: rgba(50, 49, 48, 1);
			}

			&:nth-child(2) {
				@include color-gray;

				margin-top: 15px;
				font-size: 15px;
			}
		}
	}

	.main-block {
		@include HcenterVcenterC;

		position: relative;
		width: 850px;
		height: 400px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05),
			0 5px 30px 0 rgba(166, 173, 201, 0.22);
		overflow: hidden;

		.s1 {
			@include FullRelative;
			@include HcenterC;

			flex: 1;
			padding: 25px;

			.main-title {
				@include ms-fontSize-24;
				@include color-orange-pink;

				font-weight: 400;
			}

			.s2 {
				@include HcenterVcenter;

				margin-top: 25px;

				.to-apply {
					@include a-link;
				}
			}
		}
	}

	.s3 {
		@include a-link;

		height: 150px;
		margin-top: 35px;
		font-size: 12px;
	}
}
</style>

<script>
export default {
	name: "SASApply",
	data: function () {
		return {
			Form: {
				UserName: "",
				Email: "",
				Password: "",
				VerifyCode: "",
			},
			Apply: {
				Lock: false,
			},
		};
	},
	methods: {
		verifyInput() {
			if (this.Form.UserName == "") {
				this.$barWarning("手机号不能为空", {
					status: "warning",
				});
				return false;
			} else if (
				this.Form.Email.match(
					/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g
				) === null
			) {
				this.$barWarning("邮箱格式有误", {
					status: "warning",
				});
				return false;
			} else if (this.Form.Password.match(
                /^[A-Za-z0-9_@.,]{8,18}$/g
            ) == null) {
				this.$barWarning("密码格式有误", {
					status: "warning",
				});
				return false;
			}
			return true;
		},
		async handleApply() {
			if (!this.verifyInput()) return;
			if (this.Apply.Lock) return;
			this.Apply.Lock = true;
			let form = this.Form;
			this.$api(
				form.UserName,
				form.Password,
				null,
				form.Email,
				null
			)
				.then(() => {
					this.$barWarning("注册成功", {
						status: "correct",
					});
					this.Apply.Lock = false;
					this.$Go("/login");
				})
				.catch((result) => {
					if (result.data) {
						result = result.data;
					}
					let msg =
						result.errors != null
							? result.errors[0].message
							: result.title;
					this.$barWarning(`注册失败: 原因: ${msg}`, {
						status: "warning",
					});
					this.Apply.Lock = false;
				});
		},
		handleEnter(event) {
			if (event.keyCode == 13) this.handleApply();
		}
	},
};
</script>