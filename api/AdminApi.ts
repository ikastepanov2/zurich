import { APIRequestContext } from '@playwright/test';

interface UserPayload {
  username: string;
  password?: string;
  status: boolean;
  userRoleId: number;
  empNumber: number;
}

export class AdminApi {
  constructor(private readonly api: APIRequestContext) {}

  // Create a new user
  async createUser(username: string, password: string): Promise<number> {
    const payload: UserPayload = {
      username,
      password,
      status: true,
      userRoleId: 2, // ESS role
      empNumber: 7,  // Demo employee
    };

    const response = await this.api.post('/web/index.php/api/v2/admin/users', {
      data: payload,
    });

    if (!response.ok()) {
      throw new Error(`Create user failed: ${response.status()}`);
    }

    const body = await response.json();
    return body.data.id;
  }

  // Get user by username
  async getUser(username: string) {
    const response = await this.api.get(
      `/web/index.php/api/v2/admin/users?username=${username}`
    );

    if (!response.ok()) {
      throw new Error(`Get user failed: ${response.status()}`);
    }

    const body = await response.json();
    return body.data ?? [];
  }

  // Update user - safely sends required fields
async updateUser(userId: number, updateData: Partial<UserPayload>) {
  const users = await this.getUserById(userId);

  if (users.length === 0)
    throw new Error(`User with id ${userId} not found`);

  const existingUser = users[0];

  const payload = {
    username: updateData.username ?? existingUser.userName,
    status: existingUser.status,
    userRoleId: existingUser.userRole?.id ?? 2,
    empNumber: existingUser.employee?.empNumber ?? 7,
    password: updateData.password ?? undefined
  };

  const response = await this.api.put(
    `/web/index.php/api/v2/admin/users/${userId}`,
    { data: payload }
  );

  if (!response.ok()) {
    throw new Error(`Update user failed: ${response.status()}`);
  }
}


// Helper to get user by ID
async getUserById(userId: number) {
  const response = await this.api.get(`/web/index.php/api/v2/admin/users/${userId}`);
  if (!response.ok()) throw new Error(`Get user failed: ${response.status()}`);
  const body = await response.json();
  return body.data ?? [];
}



  // Delete user by ID
  async deleteUser(userId: number) {
    const response = await this.api.delete('/web/index.php/api/v2/admin/users', {
      data: { ids: [userId] },
    });

    if (!response.ok()) {
      throw new Error(`Delete user failed: ${response.status()}`);
    }
  }
}
