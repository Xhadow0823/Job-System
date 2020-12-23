import { DApplyment, Applyment, Job } from './models';

import { Types } from 'mongoose'

import { sendNots } from '@/server/notification'

const bossAccept = (applyment: DApplyment) => {
    applyment.state = 1
    applyment.save()
}

const applicantAccept = (applyment: DApplyment) => {
    applyment.state = 2
    applyment.save()
}

const applicantRefuse = (applyment: DApplyment) => {
    applyment.state = 3
    applyment.save()
}

const bossRefuse = (applyment: DApplyment) => {
    applyment.state = 4
    applyment.save()
}

const applicantGiveup = (applyment: DApplyment) => {
    applyment.state = 5
    applyment.save()
}

export const createApplyment = async(applicant: Types.ObjectId, job: Types.ObjectId, resume: string) => {
    await Applyment.create({
        applicant: applicant,
        job: job,
        resume: resume
    });
    console.log('Applyment成功創建')
}

export const findDataApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    const Data = await Job.findById(target?.job)
    if (Data) {
        return Data.content
    }
}

export const bossAcceptApplyment = async(applicant: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applicant)
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        bossAccept(targetApplyment)
        sendNots(applicant, targetJob?.title + '的工作申請已成功被接受')
    }
    console.log('老闆成功接受')
}
export const bossRefuseApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    if (target) { bossRefuse(target) }
    console.log('老闆成功拒絕')
}
export const applicantAcceptApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    if (target) { applicantAccept(target) }
    console.log('申請人成功拒絕')
}
export const applicantGiveupApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    if (target) { applicantGiveup(target) }
    console.log('申請人成功放棄')
}

export const applicantRefuseApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    if (target) { applicantRefuse(target) }
    console.log('申請人成功拒絕')
}
