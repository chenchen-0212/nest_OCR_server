import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Headers,
  HttpCode,
  Version,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
// @Controller({
//   path: 'user',
//   version: '1',
// })       // 整个restful接口版本控制
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    // findAll(@Query('name11') query: any) {       //自定义获取query里面的参数，没有该参数，返回undefined
    console.log(query);
    return this.userService.findAll();
  }

  @Get('captcha')
  getCaptcha(@Res() res: any) {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      ignoreChars: '0o1i', //验证码字符中排除0o1i
      noise: 2, //干扰线
      color: true, //验证码字符是否有颜色，默认没有，如果设定了背景颜色，那么默认有
    });
    const captchaText = captcha.text.toLowerCase();
    console.log(captchaText);
    res.type('image/svg+xml');
    res.status(200).send(captcha.data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
